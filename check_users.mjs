const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.user.findMany({ select: { id: true, supabaseId: true, email: true, role: true } })
  .then(users => { console.log('USERS:', JSON.stringify(users, null, 2)); return p[''](); })
  .catch(e => { console.error('ERRO:', e.message); return p[''](); });
