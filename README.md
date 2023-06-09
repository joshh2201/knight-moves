# Knight's Shortest Path Finder

Hey there! Welcome to the Knight Moves project. This little web application is built with JavaScript, HTML, and CSS. It's a fun project that computes and displays the shortest path between two squares on a chessboard using a knight's movements.

## How It Works

When you open the web application, you'll see a chessboard displayed on the screen. You can select two squares on the chessboard by using the dropdown menus above the chessboard and pressing the calculate button. The application will then compute and display the shortest path that a knight can take to move from the starting square to the destination square.

The knight can move in an "L" shape, two squares in one direction and one square in the perpendicular direction. The goal is to find the shortest path, i.e., the fewest number of moves, for the knight to reach the destination square from the starting square.

## Data Structures and Search Algorithms

This project primarily focuses on implementing various data structures and search algorithms to find the shortest path. The following concepts were utilized:

- Search Trees: I used a search tree structure to represent the exploration of different paths taken by the knight on the chessboard.
- Breadth First Search (BFS): The breadth first search algorithm was employed to explore the chessboard in a systematic manner, ensuring that all possible moves were considered.
- Stacks and Queues: Stacks and queues were used as auxiliary data structures to keep track of the current state of the search process.

## Getting Started

To run the project locally on your machine, follow these steps:

1. Clone the repository to your local system.
2. Open the project folder.
3. Open the `index.html` file in your web browser.

That's it! You should now see the chessboard on your screen, ready to find the shortest path for the knight.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.

Enjoy exploring the shortest paths with our knight friend! If you have any questions or feedback, don't hesitate to reach out. Happy coding!
