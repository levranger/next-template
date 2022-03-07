function Healthz(): null {
  return null;
}

export async function getServerSideProps(context) {
  context.res.end(JSON.stringify({ data: { alive: true } }));
  return { props: {} };
}

export default Healthz;
