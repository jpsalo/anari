from pandas import DataFrame


def compute_summary_statistics(df: DataFrame):
    keys = [
        "I_F_giveaways",
        "I_F_goals",
        "I_F_points",
        "I_F_primaryAssists",
        "I_F_shotsOnGoal",
        "I_F_takeaways",
        "games_played",
        "icetime",
    ]
    summary = {}
    for key in keys:
        summary[key] = {
            "mean": df.loc[:, key].mean(),
            "median": df.loc[:, key].median(),
            "std_dev": df.loc[:, key].std(),
            "min": df.loc[:, key].min(),
            "max": df.loc[:, key].max(),
        }
    return summary
