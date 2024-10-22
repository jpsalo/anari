import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

interface Answer {
  agentText: string;
}

function Home() {
  const [inputText, setInputText] = useState("");
  const [agentText, setAgentText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ask = async (question: string) => {
    try {
      const data = await fetch("/ask", {
        body: JSON.stringify({ question }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (data.ok) {
        const answer = (await data.json()) as Answer;
        setAgentText(answer.agentText);
        setIsLoading(false);
      }
    } catch (error) {
      setErrorText("Unable to load data");
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(inputText);
    setInputText("");
    setAgentText("");
    setErrorText("");
    setIsLoading(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const MessageDisplay = ({ text }: { text: string }) => {
    if (!text) return null;

    return (
      <Box maxWidth="100%" textAlign="center">
        <Typography variant="body1" sx={{ maxWidth: "75%", margin: "0 auto" }}>
          {text}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ width: "100%" }}
    >
      <Stack
        direction="column"
        alignItems="stretch"
        spacing={3}
        sx={{ width: "100%", maxWidth: "600px" }}
      >
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <TextField
              label="Ask a question"
              placeholder="Provide me with a summary of NHL player statistics."
              variant="outlined"
              value={inputText}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={
                isLoading ? (
                  <CircularProgress sx={{ color: "darkgray" }} />
                ) : null
              }
            >
              {isLoading ? null : "Ask"}
            </Button>
          </Stack>
        </form>

        <MessageDisplay text={agentText || errorText} />
      </Stack>
    </Box>
  );
}

export default Home;
