const { DataSource } = require('typeorm');
const { Equal } = require('typeorm');

async function run() {
    const ds = new DataSource({ type: 'postgres' });
    const qb = ds.manager.createQueryBuilder();
    qb.select('a');
    qb.from('user', 'u');
    
    // Test how TypeOrm handles spaces in RHS or LHS
    const condition = qb.getWherePredicateCondition("u.profile #>> '{badges}'", Equal(1)); 
    qb.where(qb.createWhereConditionExpression(condition));
    console.log("WHERE 2:", qb.getQuery());
}
run();
