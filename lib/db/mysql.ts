import mysql from "mysql2/promise";


type Props = {
  query: string;
  values: Array<any>;
}

export async function query({ query, values = [] }: Props) {
  const dbConnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const [ result, field ] = await dbConnection.execute(query, values);
    const data = JSON.parse(JSON.stringify(result));
    return data;
  } catch (error) {
    throw error;
  } finally {
    dbConnection.end();
  }
}
