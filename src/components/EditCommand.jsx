import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import {
  addCommand,
  updateCommand,
  deleteCommand,
} from "../scripts/supabaseClient";

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

const categories = [
  {
    value: "チャット",
    label: "チャット",
  },
  {
    value: "パーティ／ソーシャル",
    label: "パーティ／ソーシャル",
  },
  {
    value: "対PC／NPC／オブジェクト",
    label: "対PC／NPC／オブジェクト",
  },
  {
    value: "アクション／ホットバー",
    label: "アクション／ホットバー",
  },
  {
    value: "バトル",
    label: "バトル",
  },
  {
    value: "その他の機能",
    label: "その他の機能",
  },
  {
    value: "マクロ専用",
    label: "マクロ専用",
  },
  {
    value: "コンフィグ",
    label: "コンフィグ",
  },
  {
    value: "エモート",
    label: "エモート",
  },
  {
    value: "メニュー呼び出し",
    label: "メニュー呼び出し",
  },
];

function EditCommand(props) {
  const closeModal = (event, reason) => {
    if (reason !== "escapeKeyDown") {
      props.onClose();
      setDisabled(false);
    }
  };
  const [isDisabled, setDisabled] = useState(false);
  const [errors, setError] = useState(null);
  const categoryRef = useRef(null);
  const commandRef = useRef(null);
  const detailRef = useRef(null);
  // const [categoryError, setCategoryError] = useState(false);
  // const [commandError, setCommandError] = useState(false);
  // const [detailError, setDetailError] = useState(false);

  let isUpdate = false;
  const defaultItem = {
    category: "チャット",
    command: "",
    detail: "",
  };

  if (props?.item) {
    isUpdate = true;
    const item = props.item;
    defaultItem.id = item.id;
    defaultItem.category = item.category;
    defaultItem.command = item.command;
    defaultItem.detail = item.detail;
  }
  // const categoryChange = () => {
  //   if (categoryRef.current) {
  //     const ref = categoryRef.current;
  //     if (!ref.validity.valid) {
  //       setCategoryError(true);
  //     } else {
  //       setCategoryError(false);
  //     }
  //   }
  // };
  // const commandChange = () => {
  //   if (commandRef.current) {
  //     const ref = commandRef.current;
  //     if (!ref.validity.valid) {
  //       setCommandError(true);
  //     } else {
  //       setCommandError(false);
  //     }
  //   }
  // };
  // const detailChange = () => {
  //   if (detailRef.current) {
  //     const ref = detailRef.current;
  //     if (!ref.validity.valid) {
  //       setDetailError(true);
  //     } else {
  //       setDetailError(false);
  //     }
  //   }
  // };
  return (
    <>
      {props.showModal ? (
        <Modal
          keepMounted
          open={props.showModal}
          onClose={closeModal}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              {isUpdate ? "更新" : "新規追加"}
            </Typography>
            <Box id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                id="category"
                select
                label="カテゴリ"
                SelectProps={{
                  native: true,
                }}
                variant="standard"
                fullWidth
                // error={categoryError}
                // inputProps={{ required: true }}
                inputRef={categoryRef}
                defaultValue={defaultItem.category}
                // helperText={categoryRef?.current?.validationMessage}
                // onChange={categoryChange}
              >
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                required
                id="command"
                label="テキストコマンド"
                variant="standard"
                fullWidth
                // error={commandError}
                // inputProps={{ required: true, pattern: "^/[a-zA-Z0-9]+$" }}
                inputRef={commandRef}
                defaultValue={defaultItem.command}
                // helperText={commandRef?.current?.validationMessage}
                // onChange={commandChange}
              />
              <TextField
                required
                id="detail"
                label="内容"
                multiline
                rows={4}
                variant="standard"
                fullWidth
                // error={detailError}
                // inputProps={{ required: true }}
                inputRef={detailRef}
                defaultValue={defaultItem.detail}
                // helperText={detailRef?.current?.validationMessage}
                // onChange={detailChange}
              />
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
              {isUpdate ? (
                <Button
                  color="error"
                  variant="outlined"
                  onClick={async () => {
                    setDisabled(true);
                    if (!window.confirm("削除しますか?")) {
                      setDisabled(false);
                      return;
                    }

                    deleteCommand(defaultItem.id);
                    setDisabled(false);
                    closeModal();
                  }}
                >
                  削除
                </Button>
              ) : (
                <Box></Box>
              )}
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
                  disabled={
                    isDisabled // || categoryError || commandError || detailError
                  }
                  onClick={async () => {
                    setDisabled(true);
                    // categoryChange();
                    // commandChange();
                    // detailChange();
                    // if (categoryError || commandError || detailError) {
                    //   return;
                    // }

                    const data = {
                      category: categoryRef.current.value,
                      command: commandRef.current.value,
                      detail: detailRef.current.value,
                    };
                    let res;
                    if (isUpdate) {
                      data.id = defaultItem.id;
                      data.updated_at = new Date();
                      res = await updateCommand(data);
                    } else {
                      res = await addCommand(data);
                    }

                    if (res?.error) {
                      setError(res.error.message);
                      setDisabled(false);
                      return;
                    }

                    setDisabled(false);
                    closeModal();
                  }}
                >
                  保存
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

export default EditCommand;
