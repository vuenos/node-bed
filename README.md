# Nodejs 백엔드

## 기본 설정
- nodejs v20.16.0
- DB: MongoDB
- Deploy: Vercel
- typeScript

### tsconfig.json
```javascript
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}

```
### vercel.json
```javascript
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "dist/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}

```
### package.json
```javascript
  "name": "node-bed",
  "version": "1.0.0",
  "main": "src/server.ts",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "nodemon",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
