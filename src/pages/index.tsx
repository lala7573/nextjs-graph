import Link from "next/link";
import { getSortedNotesData } from "lib/notes";
import Date from "components/date";

function HomePage({ notes }) {
  return (
    <div>
      <h1>Notes 01</h1>
      {notes.map(({ id, date }: { id: string; date: string }, idx) => (
        <Link key={idx} href={`./notes/${id}`}>
          <div>
            <div>
              {date} - {id}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const notes = getSortedNotesData();
  return {
    props: {
      notes,
    },
  };
}

export default HomePage;
