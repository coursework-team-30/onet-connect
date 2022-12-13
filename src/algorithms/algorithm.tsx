export function dfs(grid: number[][], i: number, j: number, 
    n: number, m: number, turns: number, 
    direction: string, dest_i: number, dest_j: number, visited: boolean[][], path: number[][]) {
    // No Outings.
    if(i < 0 || i >= n || j < 0 || j >= m || visited[i][j]) {
        return false;
    }
    // Other Type in middle and not the destination.
    if((i !== dest_i || j !== dest_j) && (grid[i][j] !== 0 && direction !== "")) {
        return false;
    }
    // no more than 2 turns
    if(turns > 2) {
        return false;
    }
    visited[i][j] = true;
    // if met
    if(i === dest_i && j === dest_j) {
        path.push([i, j]);
        return true;
    }

    // continuation
    let dx: number[] = [1, -1, 0, 0];
    let dy: number[] = [0, 0, 1, -1];

    if(direction === "") {
        for(let index = 0; index < 4; index++) {
            if(dx[index] !== 0) {
                path.push([i, j]);
                if(dfs(grid, i + dx[index], j + dy[index], n, m, turns, "vertical", dest_i, dest_j, visited, path))
                    return true;
                path.pop();
            } else if(dy[index] !== 0) {
                path.push([i, j]);
                if(dfs(grid, i + dx[index], j + dy[index], n, m, turns, "horizontal", dest_i, dest_j, visited, path))
                    return true;
                path.pop();
            }
        }
    } else {
        if(direction === "horizontal") {
            for(let index = 0; index < 4; index++) {
                if(dx[index] !== 0) {
                    path.push([i, j]);
                    if(dfs(grid, i + dx[index], j + dy[index], n, m, turns + 1, "vertical", dest_i, dest_j, visited, path))
                        return true;
                    path.pop();
                } else if(dy[index] !== 0) {
                    path.push([i, j]);
                    if(dfs(grid, i + dx[index], j + dy[index], n, m, turns, "horizontal", dest_i, dest_j, visited, path))
                        return true;
                    path.pop();
                }
            }
        } else if(direction === "vertical") {
            for(let index = 0; index < 4; index++) {
                if(dx[index] !== 0) {
                    path.push([i, j]);
                    if(dfs(grid, i + dx[index], j + dy[index], n, m, turns, "vertical", dest_i, dest_j, visited, path))
                        return true;
                    path.pop();
                } else if(dy[index] !== 0) {
                    path.push([i, j]);
                    if(dfs(grid, i + dx[index], j + dy[index], n, m, turns + 1, "horizontal", dest_i, dest_j, visited, path))
                        return true;
                    path.pop();
                }
            }
        }
    }
    // visited[i][j] = false;
}