import { sql } from "@vercel/postgres";

export default async function Cart({
  params
} : {
  params: { user: string }
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from test where id=1`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.name}>
          {row.Name} - {row.postcode}
        </div>
      ))}
    </div>
  );
}
