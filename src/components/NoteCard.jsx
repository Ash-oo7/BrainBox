import { useRef, useEffect, useState, useContext } from "react";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner";
import DeleteButton from "./DeleteButton";
import { NoteContext } from "../Context/NoteContext";

const NoteCard = ({ note }) => {
  let mouseStartPos = { x: 0, y: 0 };

  const { setSelectedNote } = useContext(NoteContext);
  const MAX_CHARS = 350;
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);

  const body = bodyParser(note.body);
  const colors = JSON.parse(note.colors);
  const [position, setPosition] = useState(JSON.parse(note.position));

  const [charCount, setCharCount] = useState(body.length);

  const cardRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
    setCharCount(textAreaRef.current.value.length);
  }, []);

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);

      setZIndex(cardRef.current);
      setSelectedNote(note);
    }
  };

  const mouseMove = (e) => {
    //for the calculation of move direction
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    //update the starting position for the next move
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    //new position for the card
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };

    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.log(error);
    }

    setSaving(false);
  };

  const handleKeyUp = async () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  const handleInput = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setCharCount(text.length);
      autoGrow(textAreaRef);
    } else {
      e.target.value = text.slice(0, MAX_CHARS);
    }
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      ref={cardRef}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: colors.colorText }}
          onInput={handleInput}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
          onKeyUp={handleKeyUp}
          maxLength={MAX_CHARS}
        ></textarea>
        <div
          style={{
            color: colors.colorText,
            textAlign: "right",
            width: "100%",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {charCount}/{MAX_CHARS}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
