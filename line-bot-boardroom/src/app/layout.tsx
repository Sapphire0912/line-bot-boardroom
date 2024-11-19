import "../styles/globals.css";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
