import pandas as pd
import random

def generate_units_sold():
    return random.randint(50, 500)

def generate_best_sold_period():
    start_month = random.randint(1, 12)
    end_month = random.randint(start_month, 12)
    return f"{start_month}-2024 to {end_month}-2024"

input_file = 'data.xls'  
df = pd.read_excel(input_file)

df['Units Sold'] = df.apply(lambda row: generate_units_sold(), axis=1)
df['Best Sold Period'] = df.apply(lambda row: generate_best_sold_period(), axis=1)

output_file = 'augmented_data.xlsx'  
df.to_excel(output_file, index=False)