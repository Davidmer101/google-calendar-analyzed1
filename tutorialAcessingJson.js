 let data = {
    "type": "query results",
    "query": "SELECT Activities , SUM(Duration) as TotalHours\nFROM month\nGROUP BY Activities\nORDER BY TotalHours DESC",
    "columns": [
        {
            "displayName": "Activities",
            "name": "Activities",
            "database": null,
            "table": "month",
            "type": "TEXT"
        },
        {
            "displayName": "TotalHours",
            "name": "SUM(Duration)",
            "database": null,
            "table": null,
            "type": "TEXT"
        }
    ],
    "rows": [
        [
            "Life",
            96.25
        ],
        [
            "Entertainment",
            23.75
        ],
        [
            "Work",
            17
        ],
        [
            "MED",
            0.25
        ]
    ]
}

console.log(data.rows[0][0])