from pandas import DataFrame
import pandas as pd


def find_nearest_pair(df: DataFrame, player_id):
    source_df = (
        df[df["playerId"] == player_id].select_dtypes(["number"]).reset_index(drop=True)
    )
    to_drop = df.index[df["playerId"] == player_id].tolist()
    df = df.drop(index=to_drop[0])
    source_player_id_df = source_df["playerId"]
    source_df = source_df.drop("playerId", axis=1)

    df = df.head()  # TODO: Set reasonable number for development environment
    df = df.select_dtypes(["number"]).reset_index(drop=True)
    player_id_df = df["playerId"]
    df = df.drop("playerId", axis=1)

    df = df.apply(lambda row: distance(row, source_df), axis=1)

    df = pd.concat([player_id_df, df], axis=1)
    nearest = df.loc[df["sum"].idxmin()]["playerId"]
    return nearest


def distance(row: DataFrame, b: DataFrame):
    for i, item in enumerate(row):
        row.iloc[i] = abs(item - b.iat[0, i])
    row["sum"] = row.sum()
    return row
