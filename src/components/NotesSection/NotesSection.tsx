import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { isToday } from 'date-fns';
import { IoAdd } from 'react-icons/io5';
import Button from '../Button';
import NoteCard from '../NoteCard';
import NothingHere from '../NothingHere';

type NotesSectionProps = {
  className?: string;
};

const NotesSection: React.FunctionComponent<NotesSectionProps> = (props: NotesSectionProps) => {
  const { className } = props;

  const { date, notes, setEditingNote, deleteNote } = useContext(Context);

  return (
    <section className={className}>
      <h2>
        {isToday(date) ? 'Notes for today' : 'Notes'}
        <Button
          color="secondary"
          circular={true}
          fontSize="20px"
          padding="0"
          title="create new note"
          onClick={() => setEditingNote({ id: '', time: new Date(), date, text: '' })}
        >
          <IoAdd />
        </Button>
      </h2>
      <ol>
        {notes.length ? (
          notes.map((note: Note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => setEditingNote(note)}
              onDelete={() => deleteNote(note)}
            />
          ))
        ) : (
          <li>
            <NothingHere />
          </li>
        )}
      </ol>
    </section>
  );
};

export default NotesSection;
