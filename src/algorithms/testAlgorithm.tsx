import {dfs} from "./algorithm";

// Sample Grid
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
    // Stack: For capturing the path.
    var stack: number[][] = [];

    let src_tc: number[][] = [[1, 1], [5, 2], [6, 1], [6, 7], [5, 5], [5, 4], [6, 10], [6, 2], [1, 2], [1, 8], [2, 8], [2, 9], [5, 8], [3, 9]];
    let dest_tc: number[][] = [[1, 3], [5, 3], [6, 5], [6, 3], [6, 4], [6, 6], [5, 6], [6, 8], [1, 5], [1, 10], [1, 9], [1, 12], [6, 9], [1, 4]];

    for(let index = 0; index < src_tc.length; index++) {
        if(dfs(grid, src_tc[index][0], src_tc[index][1], grid.length, grid[0].length, 0, "", dest_tc[index][0], dest_tc[index][1], visited, stack)) {
            grid[src_tc[index][0]][src_tc[index][1]] = 0;
            grid[dest_tc[index][0]][dest_tc[index][1]] = 0;
            
            console.log(index + 1, "th case --> ", stack);
        }
        stack = [];
        // console.log(visited);
        visited = new Array(grid.length).fill(false).map(() => new Array(grid[0].length).fill(false));
    }
    // console.log(visited);
    console.log(grid);
}