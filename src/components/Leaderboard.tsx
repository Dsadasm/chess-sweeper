import styles from './Leaderboard.module.css';
import { useState, useEffect } from 'react';

export default function Leaderboard() {
    const [data, setData] = useState([]);

    //fetch records from server
    useEffect(() => {
        const fetchLeaderboard = async () => {
            fetch('http://127.0.0.1:8000/api/dailyrecords/?format=json')
            .then(res => res.json())
            .then(res => {
                const rankedData = res.map((item, index) => ({
                    ...item,
                    rank: index + 1
                })) 
                setData(rankedData)
            })          
        }
        fetchLeaderboard();
    }, []);

    return (
        <>
        <div className={styles.leaderboardContainer}>
            <div className={styles.leaderboardTitle}> Leaderboard </div>
            <table className={styles.leaderboardTable}>
                <thead>
                    <tr className={styles.leaderboardHeadersRow}>
                        <th className={styles.leaderboardHeaders} style={{width: "4rem"}}>Rank</th>
                        <th className={styles.leaderboardHeaders} style={{width: "10rem"}}>Player</th>
                        <th className={styles.leaderboardHeaders} style={{width: "4rem"}}>Score</th>
                        <th className={styles.leaderboardHeaders} style={{width: "4rem"}}>Time</th>
                    </tr>
                </thead>
                
                <tbody>
                {   /* Render all records from the list */
                    data.map((record) => (
                    <LeaderboardRow key={record.id} rank={record.rank} name={record.name} point={record.point} time={record.time}/>
                ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

type leaderboardRowProps = {
    rank: number;
    name: string;
    point: number;
    time: string;
}

function LeaderboardRow( { rank, name, point, time} : leaderboardRowProps) {

    return (
        <>
        <tr className={rank%2? styles.leaderboardRecordsRowEven : styles.leaderboardRecordsRowOdd}>
            <td className={styles.leaderboardRecords}>{rank}</td>
            <td className={styles.leaderboardRecords}>{name}</td>
            <td className={styles.leaderboardRecords}>{point}</td>
            <td className={styles.leaderboardRecords}>{time}</td>
        </tr>
        </>
    )
}