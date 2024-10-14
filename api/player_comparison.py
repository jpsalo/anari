from pandas import DataFrame
import pandas as pd

from data_utils import get_player


def nearest(df: DataFrame, player_id) -> list[int]:
    source_df = (
        df[df["playerId"] == player_id].select_dtypes(["number"]).reset_index(drop=True)
    )
    to_drop = df.index[df["playerId"] == player_id].tolist()
    df = df.drop(index=to_drop[0])
    source_player_id_df = source_df["playerId"]
    source_df = source_df.drop("playerId", axis=1)

    df = df.select_dtypes(["number"]).reset_index(drop=True)
    player_id_df = df["playerId"]
    df = df.drop("playerId", axis=1)

    df = df.apply(lambda row: distance(row, source_df), axis=1)

    df = pd.concat([player_id_df, df], axis=1)
    player_ids = df.nsmallest(5, "sum")["playerId"].tolist()
    return player_ids


def distance(row: DataFrame, b: DataFrame):
    # FIXME: Causes SettingWithCopyWarning
    for i, item in enumerate(row):
        row.iloc[i] = abs(item - b.iat[0, i])
    row["sum"] = row.sum()
    return row


def find_nearest_players(df: DataFrame, player_id):
    nearest_ids = nearest(df, player_id)
    # NOTE: Perhaps this is not the best way to do this
    df = pd.DataFrame(get_player(id).iloc[0] for id in nearest_ids)
    return df
