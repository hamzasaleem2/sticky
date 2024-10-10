import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = "https://www.sticky.today";

export function WelcomeEmail({ name = "there" }) {
  const firstName = getFirstName(name);

  return (
    <Html>
      <Head />
      <Preview>Ideas that stick, literally! 😉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/sticky-logo.png`}
            width="80"
            height="80"
            alt="Sticky Logo"
            style={logo}
          />
          <Heading style={heading}>Welcome to Sticky, {firstName}!</Heading>
          <Text style={paragraph}>
            You've just found the duct tape for your brain!
            <Img src={`${baseUrl}/duct-tape.png`}
              width="80"
              height="80"
              alt="Duct Tape"
              style={logo}
            />
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={`${baseUrl}/boards`}>
              Get started!
            </Button>
          </Section>
          <Text style={paragraph}>
            Need help? Visit your Board and use the ? button to ask.
          </Text>
          <Text style={footer}>
            Best,<br />
            The Sticky team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f3e8ff",
  fontFamily: '"Red Hat Text", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "580px",
};

const logo = {
  margin: "0 auto 20px",
  display: "block",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  textAlign: "center" as const,
  color: "#5F51E8",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "26px",
  marginBottom: "26px",
  color: "#333",
};

const btnContainer = {
  textAlign: "center" as const,
  marginTop: "32px",
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "18px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 28px",
  fontWeight: "600",
};

const footer = {
  fontSize: "16px",
  lineHeight: "24px",
  marginTop: "32px",
  color: "#666",
};

function getFirstName(fullName: string): string {
  const trimmedName = fullName.trim();
  const nameParts = trimmedName.split(' ');
  if (nameParts.length <= 1) {
    return trimmedName;
  }
  return nameParts[0];
}
