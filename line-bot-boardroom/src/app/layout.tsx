import "../styles/globals.css";
import Title from "@/components/Title";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html>
      <body>
        <title>LINE 留言板</title>
        <Title />
        <main>{children}</main>
      </body>
    </html>
  );
}
