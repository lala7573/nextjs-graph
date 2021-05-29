import Head from "next/head";
import Layout from "components/layout";
import { getAllNotesIds, getNote } from "lib/notes";
import Date from "components/date";
import utilStyles from "styles/utils.module.css";

export default function Note({ noteData }) {
  return (
    <Layout>
      <Head>
        <title>{noteData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{noteData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={noteData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: noteData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const noteData = await getNote(params.id);
  return {
    props: {
      noteData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllNotesIds();
  return {
    paths,
    fallback: false,
  };
}
