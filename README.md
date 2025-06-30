# XperFrame4SAL Backend

Backend for the XperFrame4SAL framework.

## Requirements

- Node.js (v18+ recommended)
- pnpm
- (PostgreSQL and MongoDB)  OR (Docker)

## Setup

1. Clone this repository:
    ```sh
    git clone https://github.com/Framework-for-Search-as-Learning/xperframe4sal-backend.git
    cd xperframe4sal-backend
    ```

2. Install dependencies:
    ```sh
    pnpm install
    ```

3. Copy the example environment file and configure your variables:
    ```sh
    cp .env.example .env
    # Edit .env with your database
    ```

4. Start databases using Docker:
    ```sh
    docker-compose up -d
    ```

## Running

Start the server:
```sh
pnpm start
```

The API will be available at [http://localhost:3000](http://localhost:3000).

---
For more details, see the code and comments in
