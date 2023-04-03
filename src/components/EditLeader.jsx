import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { addLeader, updateLeader, deleteLeader } from "../scripts/leader";

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
    value: "アステカ",
    label: "アステカ",
  },
  {
    value: "アメリカ",
    label: "アメリカ",
  },
  {
    value: "アラビア",
    label: "アラビア",
  },
  {
    value: "イギリス",
    label: "イギリス",
  },
  {
    value: "インド",
    label: "インド",
  },
  {
    value: "インドネシア",
    label: "インドネシア",
  },
  {
    value: "エジプト",
    label: "エジプト",
  },
  {
    value: "オーストラリア",
    label: "オーストラリア",
  },
  {
    value: "ギリシャ",
    label: "ギリシャ",
  },
  {
    value: "クメール",
    label: "クメール",
  },
  {
    value: "コンゴ",
    label: "コンゴ",
  },
  {
    value: "シュメール",
    label: "シュメール",
  },
  {
    value: "スキタイ",
    label: "スキタイ",
  },
  {
    value: "スペイン",
    label: "スペイン",
  },
  {
    value: "ドイツ",
    label: "ドイツ",
  },
  {
    value: "ヌビア",
    label: "ヌビア",
  },
  {
    value: "ノルウェー",
    label: "ノルウェー",
  },
  {
    value: "ブラジル",
    label: "ブラジル",
  },
  {
    value: "フランス",
    label: "フランス",
  },
  {
    value: "ペルシア",
    label: "ペルシア",
  },
  {
    value: "ポーランド",
    label: "ポーランド",
  },
  {
    value: "マケドニア",
    label: "マケドニア",
  },
  {
    value: "ローマ",
    label: "ローマ",
  },
  {
    value: "ロシア",
    label: "ロシア",
  },
  {
    value: "中国",
    label: "中国",
  },
  {
    value: "日本",
    label: "日本",
  },
  {
    value: "オランダ",
    label: "オランダ",
  },
  {
    value: "クリー",
    label: "クリー",
  },
  {
    value: "グルジア",
    label: "グルジア",
  },
  {
    value: "スコットランド	",
    label: "スコットランド	",
  },
  {
    value: "ズールー",
    label: "ズールー",
  },
  {
    value: "マプチェ",
    label: "マプチェ",
  },
  {
    value: "モンゴル",
    label: "モンゴル",
  },
  {
    value: "韓国	",
    label: "韓国	",
  },
  {
    value: "インカ",
    label: "インカ",
  },
  {
    value: "オスマン",
    label: "オスマン",
  },
  {
    value: "カナダ",
    label: "カナダ",
  },
  {
    value: "スウェーデン",
    label: "スウェーデン",
  },
  {
    value: "ハンガリー",
    label: "ハンガリー",
  },
  {
    value: "フェニキア",
    label: "フェニキア",
  },
  {
    value: "マオリ",
    label: "マオリ",
  },
  {
    value: "マリ	",
    label: "マリ	",
  },
  {
    value: "マヤ",
    label: "マヤ",
  },
  {
    value: "大コロンビア",
    label: "大コロンビア",
  },
  {
    value: "エチオピア",
    label: "エチオピア",
  },
  {
    value: "ビザンティン	",
    label: "ビザンティン	",
  },
  {
    value: "ガリア",
    label: "ガリア",
  },
  {
    value: "バビロン",
    label: "バビロン",
  },
  {
    value: "ベトナム",
    label: "ベトナム",
  },
  {
    value: "ポルトガル	",
    label: "ポルトガル	",
  },
];

export default function EditLeader(props) {
  const closeModal = (event, reason) => {
    if (reason !== "escapeKeyDown") {
      props.onClose();
      setDisabled(false);
    }
  };
  const [isDisabled, setDisabled] = useState(false);
  const [errors, setError] = useState(null);
  const countryRef = useRef(null);
  const nameRef = useRef(null);
  const detailRef = useRef(null);

  let isUpdate = false;
  const defaultItem = {
    country: "",
    name: "",
    detail: "",
  };

  if (props?.item) {
    isUpdate = true;
    const item = props.item;
    defaultItem.id = item.id;
    defaultItem.country = item.country;
    defaultItem.name = item.name;
    defaultItem.detail = item.detail;
  }
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
                id="country"
                select
                label="国"
                SelectProps={{
                  native: true,
                }}
                variant="standard"
                fullWidth
                inputRef={countryRef}
                defaultValue={defaultItem.country}
              >
                {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                required
                id="name"
                label="指導者"
                variant="standard"
                fullWidth
                inputRef={nameRef}
                defaultValue={defaultItem.name}
              />
              <TextField
                required
                id="detail"
                label="詳細"
                multiline
                rows={4}
                variant="standard"
                fullWidth
                inputRef={detailRef}
                defaultValue={defaultItem.detail}
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

                    await deleteLeader(defaultItem.id);
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
                  disabled={isDisabled}
                  onClick={async () => {
                    setDisabled(true);

                    const data = {
                      country: countryRef.current.value,
                      name: nameRef.current.value,
                      detail: detailRef.current.value,
                    };
                    let res;
                    if (isUpdate) {
                      data.id = defaultItem.id;
                      data.updated_at = new Date();
                      res = await updateLeader(data);
                    } else {
                      res = await addLeader(data);
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
