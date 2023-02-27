import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import { addAchievement } from "../scripts/achievement";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function VictoryModal(props) {
  const leaderId = props.leader.id;
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [achievement, setAchievement] = useState("スコア");

  const closeModal = (event, reason) => {
    if (reason !== "escapeKeyDown") {
      props.onClose();
      setShowModal(false);
      setDisabled(false);
    }
  };

  const [errors, setError] = useState(null);
  return (
    <>
      <Box sx={{ width: "100%", textAlign: "right" }}>
        <IconButton
          sx={{ margin: "2px 0" }}
          aria-label="edit"
          size="small"
          component="label"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
      {showModal ? (
        <Modal
          keepMounted
          open={showModal}
          onClose={() => closeModal()}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              {props.leader.name}
            </Typography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                defaultValue="スコア"
                name="radio-buttons-group"
                onChange={(event, value) => setAchievement(value)}
              >
                <FormControlLabel
                  value="スコア"
                  control={<Radio />}
                  label="スコア"
                />
                <FormControlLabel
                  value="科学"
                  control={<Radio />}
                  label="科学"
                />
                <FormControlLabel
                  value="外交"
                  control={<Radio />}
                  label="外交"
                />
                <FormControlLabel
                  value="宗教"
                  control={<Radio />}
                  label="宗教"
                />
                <FormControlLabel
                  value="制覇"
                  control={<Radio />}
                  label="制覇"
                />
                <FormControlLabel
                  value="文化"
                  control={<Radio />}
                  label="文化"
                />
              </RadioGroup>
            </FormControl>
            <Box id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              {errors ? (
                <Alert
                  variant="outlined"
                  severity="error"
                  sx={{ marginTop: 1 }}
                >
                  {errors}
                </Alert>
              ) : (
                <></>
              )}
            </Box>
            <Box className="button-group">
              <Box></Box>
              <Box>
                <Button
                  color="gray"
                  variant="outlined"
                  onClick={async () => {
                    closeModal();
                  }}
                  sx={{ marginRight: 1 }}
                >
                  キャンセル
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  disabled={isDisabled}
                  onClick={async () => {
                    setDisabled(true);

                    const data = {
                      leader: leaderId,
                      achievement: achievement,
                    };
                    let res = await addAchievement(data);
                    if (res?.error) {
                      setError(res.error.message);
                      setDisabled(false);
                      return;
                    }

                    setDisabled(false);
                    closeModal();
                  }}
                >
                  勝利
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
