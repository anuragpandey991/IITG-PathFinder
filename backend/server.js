const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 5000;
const locationMap = {
    "Main Gate": 1,
    "Market Complex Circle": 2,
    "D-Type Circle": 3,
    "Serpentine Entrance via Market Complex": 4,
    "Serpentine Entrance via Subhansiri": 5,
    "Serpentine Entrance via Hospital": 6,
    "New Guest House": 7,
    "Hospital": 8,
    "Married Scholar Gate 2": 9,
    "Married Scholar Gate 1": 10,
    "Biotech Park Road": 11,
    "Dhansiri": 12,
    "New Sac": 13,
    "Swimming Pool Ground": 14,
    "Central Gym": 15,
    "Kameng Turn": 16,
    "Kameng": 17,
    "Manas": 18,
    "Barak Turn": 19,
    "Umiam/Barak": 20,
    "Brahma Y Junction": 21,
    "Khoka Market": 22,
    "Dihing Gate": 23,
    "Dihing Mess": 24,
    "Brahma Gate": 25,
    "Brahma Hostel": 26,
    "Kapili": 27,
    "Kapili Road": 28,
    "Tapri": 29,
    "Lohit Turn": 30,
    "Lohit": 31,
    "Old Sac Junction": 32,
    "Old Sac Office": 33,
    "Old Sac": 34,
    "Subansiri Stop": 35,
    "Subansiri": 36,
    "F-Type Bus Stop": 37,
    "Conference Circle": 38,
    "Director's Bungalow": 39,
    "Auditorium": 40,
    "Conference Centre": 41,
    "Cycle Shop": 42,
    "Library Turn": 43,
    "Library Entrance": 44,
    "Bank": 45,
    "Lecture Hall": 46,
    "Core 1": 47,
    "Academic Complex Cycle Stand": 48,
    "Core 5 Road": 49,
    "Mechanical Workshop": 50,
    "Core 5": 51,
    "Core 5 Entrance": 52,
    "Core 2": 53,
    "Core 3": 54,
    "Core 2/3 Turn": 55,
    "Hashtag": 56,
    "Core 4 Junction": 57,
    "Tea Stall Core 5": 58,
    "Core 4": 59,
    "Core 5 Road 2": 60,
    "Core 5 Road 1": 61,
    "Tea Stall Core 4": 62,
    "Academic Complex Road": 63,
    "KV Gate": 64
};

// Reverse map for converting numbers back to names
const reverseLocationMap = Object.fromEntries(
    Object.entries(locationMap).map(([key, value]) => [value, key])
);

const graph = {
    1: {2: 262},
    2: {1: 262, 3: 330, 39: 262},
    3: {2: 330, 4: 130},
    4: {5: 200, 3: 130},
    5: {4: 200, 6: 66, 37: 157},
    6: {5: 66, 7: 131},
    7: {6: 131, 8: 66, 37: 260},
    8: {7: 66, 9: 131},
    9: {8: 131, 10: 66},
    10: {9: 66, 11: 66},
    11: {10: 66, 12: 150},
    12: {11: 150, 13: 130},
    13: {12: 130, 14: 100},
    14: {13: 100, 15: 66},
    15: {14: 66, 32: 250, 16: 140},
    16: {15: 140, 17: 200, 18: 240},
    17: {16: 200},
    18: {16: 240, 19: 52},
    19: {18: 52, 20: 175, 21: 132},
    20: {19: 175},
    21: {19: 132, 23: 60, 22: 66},
    22: {21: 66, 64: 716},
    23: {21: 60, 24: 105, 25: 200},
    24: {23: 105},
    25: {23: 200, 26: 130, 27: 160},
    26: {25: 130},
    27: {25: 160, 28: 130},
    28: {29: 200, 64: 460, 27: 130},
    29: {28: 200, 30: 20, 43: 170},
    30: {29: 20, 31: 131, 32: 200},
    31: {30: 131},
    32: {33: 109, 15: 250, 35: 130, 30: 200},
    33: {34: 60},
    34: {33: 60},
    35: {32: 130, 36: 130, 40: 130, 38: 262},
    35: {32: 130, 36: 130, 40: 130, 38: 262},
    36: {35: 130, 37: 400},
    38: {35: 262, 39: 330, 49: 380},
    39: {38: 330, 2: 262},
    40: {35: 130, 41: 80, 42: 79},
    41: {40: 80, 45: 20},
    42: {40: 79, 44: 53, 43: 92},
    43: {42: 92, 63: 105, 29: 170},
    44: {42: 53, 45: 50},
    45: {46: 105, 44: 50, 41: 20},
    46: {45: 105, 47: 100},
    47: {48: 120, 49: 100, 46: 100},
    48: {47: 120, 63: 66, 55: 250},
    49: {38: 380, 50: 91, 47: 100},
    50: {49: 91, 52: 182},
    51: {52: 40},
    52: {53: 130, 54: 130, 51: 40},
    53: {52: 130, 54: 20, 55: 130},
    54: {53: 20, 52: 130, 55: 130},
    55: {48: 250, 56: 122, 53: 130, 54: 130},
    56: {55: 122, 57: 115},
    57: {56: 115, 58: 130, 64: 250},
    59: {58: 66, 60: 66},
    60: {58: 66, 61: 66},
    61: {60: 50, 62: 30},
    62: {52: 200, 61: 30},
    63: {48: 66, 43: 105},
    64: {57: 250, 28: 460, 22: 716}
};

app.get('/shortd/:a/:b', (req, res) => {
    const a = locationMap[req.params.a];
    const b = locationMap[req.params.b];
    console.log("a, b: ", a, b);
    const dijkstra = (src, dst) => {
        const inf = Infinity;
        const n = 65;
        const distance = Array(n + 1).fill(inf);
        distance[src] = 0;
        const smallest = [];
        const path = Array(n + 1).fill(-1);

        const g = {};
        Object.keys(graph).forEach((u) => {
            g[u] = [];
            Object.keys(graph[u]).forEach((v) => {
                g[u].push([parseInt(v), graph[u][v]]);
                if (!g[v]) g[v] = [];
                g[v].push([parseInt(u), graph[u][v]]);
            });
        });

        smallest.push([distance[src], src]);

        while (smallest.length) {
            const [dis, node] = smallest.shift();
            if (dis > distance[node]) continue;

            for (const [neigh, cost] of g[node]) {
                if (dis + cost < distance[neigh]) {
                    path[neigh] = node;
                    distance[neigh] = dis + cost;
                    smallest.push([distance[neigh], neigh]);
                }
            }
        }

        if (distance[dst] === inf) {
            return [-1];
        }

        const resultPath = [];
        let current = dst;
        while (current > 0) {
            resultPath.push(current);
            current = path[current];
        }

        return {
            from: reverseLocationMap[src],
            to: reverseLocationMap[dst],
            path: resultPath.reverse().map((node) => reverseLocationMap[node]),
            totalDis: distance[dst]
        };
    };

    const result = dijkstra(a, b);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
