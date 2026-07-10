-- prisma/seed.sql
INSERT INTO "User" (
  id,
  email,
  password,
  "firstName",
  "lastName",
  "createdAt",
  "updatedAt"
) VALUES (
  'cmrdly2nc00008ibqfk5nmui1',
  'owner@gmail.com',
  '$2b$12$8xYzKQYxQw6tKxQw6tKxQw6tKxQw6tKxQw6tKxQw6tKxQw6tKxQw6tKxQw6', -- Bcrypt hash của "Admin@123" với salt rounds = 12
  'Owner',
  'User',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;
