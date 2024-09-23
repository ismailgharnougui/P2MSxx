from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np

from flask_cors import CORS

app = Flask(__name__)

CORS(app)


# Load the trained model
model = joblib.load('decision_tree_model.joblib')

# Load the label encoders
encoders = joblib.load('label_encoderss.joblib')

# Load the list of model features
model_features = joblib.load('model_features.joblib')

# Load the augmented dataset
df = pd.read_excel('augmented_data.xlsx')

# Apply the same preprocessing steps as in your notebook
# Apply the saved encoders to the categorical columns before making predictions
categorical_cols = ['Désignation', 'Collection', 'Famille', 'Fournisseur', 'Unite']



# Define the function to extract months
def extract_months(period):
    start_part, _, end_part = period.partition(' to ')
    start_month = int(start_part.split('-')[0])
    end_month = int(end_part.split('-')[0])
    return start_month, end_month

# Extract 'Start_Month' and 'End_Month'
df['Start_Month'], df['End_Month'] = zip(*df['Best Sold Period'].apply(extract_months))
df.drop('Best Sold Period', axis=1, inplace=True)

@app.route('/predict_period', methods=['POST'])
def predict_period():
    try:
        # Step 1: Get input data from JSON
        data = request.get_json()
        start_month = int(data.get('Start_Month'))
        end_month = int(data.get('End_Month'))

        # Step 2: Filter the DataFrame based on the input period
        period_df = df[(df['Start_Month'] <= end_month) & (df['End_Month'] >= start_month)]
        print("Filtered DataFrame based on period:", period_df.head())

        if period_df.empty:
            return jsonify({'message': 'No articles found for the given period.'}), 200

        # Step 3: Encode categorical columns using saved encoders and handle unseen categories
        categorical_cols = ['Désignation', 'Collection', 'Famille', 'Fournisseur', 'Unite']

        for col in categorical_cols:
            print(f"Original {col} values: {period_df[col].unique()}")
            if col in encoders:
                known_classes = encoders[col].classes_

                # Replace unseen categories with a default value (-1)
                period_df.loc[~period_df[col].isin(known_classes), col] = 'UNKNOWN'

                # Apply LabelEncoder and handle unknown values as -1
                encoder = encoders[col]
                all_classes = list(encoder.classes_) + ['UNKNOWN']
                encoder.classes_ = np.array(all_classes)
                
                period_df[col] = encoder.transform(period_df[col].astype(str))
                print(f"Encoded {col} values: {period_df[col].unique()}")
            else:
                return jsonify({'error': f'Missing encoder for column {col}'}), 500

        # Step 4: Prepare features for prediction
        X_period = period_df[model_features]
        print(f"Model features: {model_features}")
        print(f"Data passed for prediction: {X_period.columns.tolist()}")
        print("Data types of features before prediction:", X_period.dtypes)

        # Step 5: Make predictions
        predictions = model.predict(X_period)
        print("Predictions:", predictions)

        # Step 6: Add predictions to the DataFrame
        period_df = period_df.copy()
        period_df['Predicted_Sale_Category'] = predictions

        # Step 7: Filter high-sale articles
        high_sale_articles = period_df[period_df['Predicted_Sale_Category'] == 1]

        # Step 8: Sort by 'Units Sold' and take the top 4
        top_articles = high_sale_articles.sort_values(by='Units Sold', ascending=False).head(4)

        # Step 9: Prepare the result
        result = top_articles[['Réf. Art', 'Désignation', 'Units Sold']].to_dict(orient='records')

        # Step 10: Return the result as JSON
        return jsonify({'high_sale_articles': result}), 200

    except Exception as e:
        # Step 11: Catch and print any errors
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True, port=5001)
