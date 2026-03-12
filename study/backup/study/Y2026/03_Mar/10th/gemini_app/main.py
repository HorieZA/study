import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import numpy as np
import os
import random

# --- Setup Korean Font ---
try:
    font_name = fm.FontProperties(fname='c:/Windows/Fonts/malgun.ttf').get_name()
    plt.rc('font', family=font_name)
except FileNotFoundError:
    print("The 'Malgun Gothic' font was not found. Using default sans-serif font.")
    plt.rc('font', family='sans-serif')
plt.rcParams['axes.unicode_minus'] = False

# --- Clean up old chart files ---
for file in os.listdir('.'):
    if file.endswith('.png'):
        os.remove(file)

# --- Generate More Complex Random Data ---
np.random.seed(42) # for reproducibility
num_rows = 20
data = {
    '연도': np.arange(2000, 2000 + num_rows),
    '매출': np.random.randint(100, 500, size=num_rows),
    '비용': np.random.randint(50, 400, size=num_rows),
    '고객 수': np.random.randint(10, 100, size=num_rows)
}
df = pd.DataFrame(data)
df['수익'] = df['매출'] - df['비용']

# --- Chart Creation Functions ---
def create_line_chart(index):
    plt.figure(figsize=(10, 6))
    plt.plot(df['연도'], df['매출'], marker='o', label='매출')
    plt.plot(df['연도'], df['비용'], marker='x', label='비용')
    plt.title(f'차트 {index}: 연간 매출 및 비용')
    plt.xlabel('연도')
    plt.ylabel('금액')
    plt.legend()
    plt.grid(True)
    plt.savefig(f'random_chart_{index}_line.png')
    plt.close()

def create_bar_chart(index):
    plt.figure(figsize=(10, 6))
    plt.bar(df['연도'], df['수익'], color='skyblue')
    plt.title(f'차트 {index}: 연간 수익')
    plt.xlabel('연도')
    plt.ylabel('수익')
    plt.savefig(f'random_chart_{index}_bar.png')
    plt.close()

def create_scatter_plot(index):
    plt.figure(figsize=(10, 6))
    plt.scatter(df['고객 수'], df['매출'], alpha=0.6)
    plt.title(f'차트 {index}: 고객 수와 매출의 상관관계')
    plt.xlabel('고객 수')
    plt.ylabel('매출')
    plt.grid(True)
    plt.savefig(f'random_chart_{index}_scatter.png')
    plt.close()

def create_histogram(index):
    plt.figure(figsize=(10, 6))
    plt.hist(df['수익'], bins=10, color='lightgreen', edgecolor='black')
    plt.title(f'차트 {index}: 수익 분포')
    plt.xlabel('수익')
    plt.ylabel('빈도')
    plt.savefig(f'random_chart_{index}_hist.png')
    plt.close()

# --- Generate 10 Random Charts ---
chart_functions = [
    create_line_chart,
    create_bar_chart,
    create_scatter_plot,
    create_histogram
]

for i in range(1, 11):
    # Choose a random chart function and call it
    random.choice(chart_functions)(i)

print("10개의 랜덤 차트가 성공적으로 생성되었습니다.")

