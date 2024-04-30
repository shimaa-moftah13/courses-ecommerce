
// import * as React from "react";

// export default function Email() {
//   return (
//     <Html>
//       <Button
//         href="https://example.com"
//         style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
//       >
//         Click me
//       </Button>
//     </Html>
//   );
// }

import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
