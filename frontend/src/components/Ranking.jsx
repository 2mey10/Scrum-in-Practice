import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import AndroidIcon from '@mui/icons-material/Android';



function Ranking() {

    const [ranks, setRanks] = useState([
        // {
        //     id: 1,
        //     challengeId: 'CH-001',
        //     userName: 'John Doe',
        //     challenger: 'AI',
        //     modelName: 'Model A',
        //     accuracy: 0.8,
        //     precision: 0.7,
        //     recall: 0.9,
        //     f1: 0.8,
        //     // iouScore: 0.7,
        //     // diceScore: 0.8,
        // },
        // {
        //     id: 2,
        //     challengeId: 'CH-001',
        //     userName: 'John Doe',
        //     challenger: 'AI',
        //     modelName: 'Model A',
        //     accuracy: 0.8,
        //     precision: 0.7,
        //     recall: 0.9,
        //     f1: 0.8,
        //     // iouScore: 0.7,
        //     // diceScore: 0.8,
        // },
        // {
        //     id: 3,
        //     challengeId: 'CH-002',
        //     userName: 'John Doe',
        //     challenger: 'AI',
        //     modelName: 'Model A',
        //     accuracy: 0.8,
        //     precision: 0.7,
        //     recall: 0.9,
        //     f1: 0.8,
        //     // iouScore: 0.7,
        //     // diceScore: 0.8,
        // },
        // {
        //     id: 4,
        //     challengeId: 'CH-002',
        //     userName: 'Jane Smith',
        //     challenger: 'AI',
        //     modelName: 'Model B',
        //     accuracy: 0.9,
        //     precision: 0.8,
        //     recall: 0.95,
        //     f1: 0.9,
        //     // iouScore: 0.8,
        //     // diceScore: 0.9,
        // },
        // {
        //     id: 5,
        //     challengeId: 'CH-003',
        //     userName: 'Bob Johnson',
        //     challenger: 'AI',
        //     modelName: 'Model C',
        //     // accuracy: 0,
        //     // precision: 0,
        //     // recall: 0,
        //     // f1: 0,
        //     iouScore: 0.75,
        //     diceScore: 0.85,
        // },
        // {
        //     id: 6,
        //     challengeId: 'CH-003',
        //     userName: 'Bob Johnson',
        //     challenger: 'Human',
        //     // modelName: 'Model C',
        //     // accuracy: 0,
        //     // precision: 0,
        //     // recall: 0,
        //     // f1: 0,
        //     iouScore: 0.75,
        //     diceScore: 0.85,
        // },
        // {
        //     id: 7,
        //     challengeId: 'CH-003',
        //     userName: 'Bob Johnson',
        //     challenger: 'Human',
        //     // modelName: 'Model C',
        //     // accuracy: 0,
        //     // precision: 0,
        //     // recall: 0,
        //     // f1: 0,
        //     iouScore: 0.75,
        //     diceScore: 0.85,
        // },
        // {
        //     id: 8,
        //     challengeId: 'CH-003',
        //     userName: 'Bob Johnson',
        //     challenger: 'Human',
        //     // modelName: 'Model C',
        //     accuracy: 0.6,
        //     precision: 0.4,
        //     recall: 0.4,
        //     f1: 0.5,
        //     // iouScore: 0.75,
        //     // diceScore: 0.85,
        // },
    ])

    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedChallengeId, setSelectedChallengeId] = useState(null);

    useEffect(() => {
        const fetchRankings = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/rankinglist/");
            const data = await response.json();
            console.log(data);
            setRanks(data);
        };
        fetchRankings();
    }, []);

    const sortedRanks = ranks.slice().sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const handleChallengeIdClick = (Cid) => {
        setSelectedChallengeId(selectedChallengeId === Cid ? null : Cid);
    };

    const filteredRanks = selectedChallengeId
        ? sortedRanks.filter((row) => row.Challengid === selectedChallengeId)
        : sortedRanks;

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell onClick={() => handleSort('Challengid')}>Challenge ID</TableCell>
                    <TableCell onClick={() => handleSort('username')}>User Name</TableCell>
                    <TableCell onClick={() => handleSort('modelname')}>Model Name</TableCell>
                    <TableCell onClick={() => handleSort('is_human')}>challenger</TableCell>
                    <TableCell onClick={() => handleSort('Accuracy')}>Accuracy</TableCell>
                    <TableCell onClick={() => handleSort('Precision')}>Precision</TableCell>
                    <TableCell onClick={() => handleSort('Recall')}>Recall</TableCell>
                    <TableCell onClick={() => handleSort('F1')}>F1</TableCell>
                    {/* <TableCell onClick={() => handleSort('iouScore')}>IOU Score</TableCell>
                    <TableCell onClick={() => handleSort('diceScore')}>Dice Score</TableCell> */}
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredRanks.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell onClick={() => handleChallengeIdClick(row.Challengid)}>
                            {row.Challengid}
                        </TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.modelname}</TableCell>
                        <TableCell>
                            {row.is_human === false? (
                                <AndroidIcon fontSize="large" />
                            ) : (
                                <SentimentVerySatisfiedIcon fontSize="large" />
                            )}
                        </TableCell>
                        <TableCell>{row.Accuracy}</TableCell>
                        <TableCell>{row.Precision}</TableCell>
                        <TableCell>{row.Recall}</TableCell>
                        <TableCell>{row.F1}</TableCell>
                        {/* <TableCell>{row.iouScore}</TableCell>
                        <TableCell>{row.diceScore}</TableCell> */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default Ranking;
