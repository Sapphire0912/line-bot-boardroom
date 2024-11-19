import "../styles/globals.css";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html>
      <body>
        <title>LINE 留言板</title>
        <main>{children}</main>
      </body>
    </html>
  );
}
