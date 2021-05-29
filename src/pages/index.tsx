import Date from "components/date";
import { getSortedNotesData } from "lib/notes";

function HomePage({ notes }) {
  return (
    <div>
      <h1>Notes</h1>
      {notes.map(({ id, date }: { id: string; date: string }, idx) => (
        <a key={idx} href={`./notes/${id}`}>
          <div>{id}</div>
        </a>
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
