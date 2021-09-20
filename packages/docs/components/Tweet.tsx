import { atoms } from "../../tonfisk";

type Props = {
  name: string;
  handle: string;
  content: string;
  avatarUrl: string;
};

export function Tweet(props: Props): JSX.Element {
  return (
    <div
      className={atoms({
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        boxShadow: {
          lightMode: "none",
          darkMode: "none",
        },
        padding: "xl",
        width: "36ch",
        background: "white",
      })}
    >
      <div
        className={atoms({
          display: "flex",
          marginBottom: "l",
        })}
      >
        <img
          src={props.avatarUrl}
          className={atoms({
            width: "40px",
            height: "40px",
            borderRadius: "full",
            marginRight: "m",
          })}
        />
        <div
          className={atoms({
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          })}
        >
          <div
            className={atoms({
              fontSize: "18px",
              fontWeight: "bold",
              color: {
                lightMode: "black",
                darkMode: "gray-200",
              },
            })}
          >
            {props.name}
          </div>
          <div
            className={atoms({
              fontSize: "14px",
              color: {
                lightMode: "gray-600",
                darkMode: "gray-400",
              },
            })}
          >
            @{props.handle}
          </div>
        </div>
      </div>
      <div
        className={atoms({
          lineHeight: 1.5,
        })}
      >
        {props.content}
      </div>
    </div>
  );
}
