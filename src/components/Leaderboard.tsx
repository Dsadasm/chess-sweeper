import styles from './Leaderboard.module.css';

export default function Leaderboard() {
    const placeHolderList = [
        {rank: 1, player: "foo", score: 100, time: "1:15"},
        {rank: 2, player: "bar", score: 89,  time: "1:18"},
        {rank: 3, player: "buz", score: 67,  time: "1:26"},
        {rank: 4, player: "abc", score: 67,  time: "2:14"},
        {rank: 5, player: "xyz", score: 34,  time: "3:00"}
    ];

    // TODO: if (leaderboard is empty) return (empty template); else 

    return (
        <>
        <div className={styles.leaderboardContainer}>
            <div className={styles.leaderboardTitle}> Leaderboard </div>
            <table className={styles.leaderboardTable}>
                <tr className={styles.leaderboardHeadersRow}>
                    <th className={styles.leaderboardHeaders} style={{width: "4rem"}}>Rank</th>
                    <th className={styles.leaderboardHeaders} style={{width: "10rem"}}>Player</th>
                    <th className={styles.leaderboardHeaders} style={{width: "4rem"}}>Score</th>
                    <th className={styles.leaderboardHeaders} style={{width: "4rem"}}>Time</th>
                </tr>

                {   /* Render all records from the list */
                    placeHolderList.map((record) => (
                    <LeaderboardRow rank={record.rank} player={record.player} score={record.score} time={record.time}/>
                ))}

            </table>
        </div>
        </>
    )
}

type leaderboardRowProps = {
    rank: number;
    player: string;
    score: number;
    time: string;
}

function LeaderboardRow( { rank, player, score, time} : leaderboardRowProps) {

    return (
        <>
        <tr className={rank%2? styles.leaderboardRecordsRowEven : styles.leaderboardRecordsRowOdd}>
            <td className={styles.leaderboardRecords}>{rank}</td>
            <td className={styles.leaderboardRecords}>{player}</td>
            <td className={styles.leaderboardRecords}>{score}</td>
            <td className={styles.leaderboardRecords}>{time}</td>
        </tr>
        </>
    )
}