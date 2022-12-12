export function dfs(grid: number[][], i: number, j: number, 
    n: number, m: number, turns: number, 
    direction: string, dest_i: number, dest_j: number, visited: boolean[][]) {
// No Outings
    if(i < 0 || i >= n || j < 0 || j >= m) {
        console.log("no outings");
        return;
    }
    if(visited[i][j] === true) {
        console.log("already visited");
        return;
    }
    // Other Type in middle
    if(i > 0 && j > 0 && i < n - 1 && j < m - 1 && grid[i][j] !== 0 && direction !== "") {
        console.log("obstacle");
        return;
    }
    // no more than 2 turns
    if(turns > 2) {
        console.log("more turns");
        return;
    }
    // if met
    if(i === dest_i && j === dest_j) {
        console.log(visited);
        return;
    }
    // if(grid[i][j] === grid[dest_i][dest_j]) {
    //     console.log(visited);
    //     return;
    // }
    // continuation
    visited[i][j] = true;
    // if(!visited[i][j]) {
        if(direction === "") {
            dfs(grid, i + 1, j, n, m, turns, "vertical", dest_i, dest_j, visited);
            dfs(grid, i - 1, j, n, m, turns, "vertical", dest_i, dest_j, visited);
            dfs(grid, i, j + 1, n, m, turns, "horizontal", dest_i, dest_j, visited);
            dfs(grid, i, j - 1, n, m, turns, "horizontal", dest_i, dest_j, visited);
        } else {
            if(direction === "horizontal") {
                dfs(grid, i + 1, j, n, m, turns + 1, "vertical", dest_i, dest_j, visited);
                dfs(grid, i - 1, j, n, m, turns + 1, "vertical", dest_i, dest_j, visited);
                dfs(grid, i, j + 1, n, m, turns, "horizontal", dest_i, dest_j, visited);
                dfs(grid, i, j - 1, n, m, turns, "horizontal", dest_i, dest_j, visited);
            } else if(direction === "vertical") {
                dfs(grid, i + 1, j, n, m, turns, "vertical", dest_i, dest_j, visited);
                dfs(grid, i - 1, j, n, m, turns, "vertical", dest_i, dest_j, visited);
                dfs(grid, i, j + 1, n, m, turns + 1, "horizontal", dest_i, dest_j, visited);
                dfs(grid, i, j - 1, n, m, turns + 1, "horizontal", dest_i, dest_j, visited);
            }
        }
    visited[i][j] = false;
    // }
}


const grid = [
    [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    [
        0,
        11,
        12,
        11,
        7,
        12,
        11,
        2,
        4,
        1,
        4,
        9,
        8,
        0
    ],
    [
        0,
        9,
        5,
        10,
        11,
        6,
        7,
        10,
        1,
        8,
        3,
        2,
        10,
        0
    ],
    [
        0,
        2,
        3,
        12,
        8,
        6,
        9,
        7,
        6,
        7,
        1,
        5,
        9,
        0
    ],
    [
        0,
        6,
        5,
        6,
        3,
        2,
        6,
        3,
        8,
        4,
        9,
        11,
        5,
        0
    ],
    [
        0,
        8,
        12,
        12,
        5,
        3,
        10,
        10,
        4,
        2,
        12,
        9,
        11,
        0
    ],
    [
        0,
        4,
        1,
        7,
        3,
        4,
        5,
        7,
        1,
        8,
        10,
        2,
        1,
        0
    ],
    [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ]
];

export function testAlgo() {
    let visited: boolean[][] = new Array(grid.length).fill(false).map(() => new Array(grid[0].length).fill(false));
    // console.log(grid);
    dfs(grid, 1, 1, grid.length, grid[0].length, 0, "", 1, 3, visited);
    // console.log(visited);
}