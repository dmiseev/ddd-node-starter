## Skeleton for Node.js applications written in TypeScript

### First deploy

1. Start database container;

```bash
docker-compose up -d
```

2. Copy ormconfig.example.json to ormconfig.json with your DB connection;
3. Execute command in cli;
```bash
npm i
```

4. Install globally typeorm;
```bash
sudo npm i typeorm -g
```

5. Compile .ts to .js files to ./bin/ folder;
```bash
npm run compile
```

6. Up migrations;
```bash
typeorm migrations:run
```

7. Run Application in dev mode.
```bash
npm run dev
```

### Testing

1. Execute command in cli;
```bash
npm run test:all
```