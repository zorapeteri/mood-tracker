import React, { useEffect, useState } from 'react';
import { isToday } from 'date-fns';
import { IoAdd } from 'react-icons/io5';
import Button from '../Button';
import NoteCard from '../NoteCard';
import { getDataForDay, deleteNote } from '../../helpers';
import NothingHere from '../NothingHere';

type NotesSectionProps = {
  date: Date;
  className: string;
  editNote: (note: Note) => void;
};

const NotesSection: React.FunctionComponent<NotesSectionProps> = (props: NotesSectionProps) => {
  const { date, className, editNote } = props;
  const [notes, setNotes] = useState<Note[]>(getDataForDay(date).notes);

  useEffect(() => {
    setNotes(getDataForDay(date).notes);
  }, [date]);

  return (
    <section className={className}>
      <h2>
        {isToday(date) ? 'Notes for today' : 'Notes'}
        <Button
          color="secondary"
          circular={true}
          fontSize="20px"
          padding="0"
          onClick={() => editNote({ id: '', time: new Date(), date, text: '' })}
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
              onDelete={(id) => {
                deleteNote(date, id);
                setNotes(getDataForDay(date).notes);
              }}
              onClick={() => editNote(note)}
            />
          ))
        ) : (
          <NothingHere />
        )}
      </ol>
    </section>
  );
};

export default NotesSection;
