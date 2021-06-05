import React, { useState } from 'react';
import { isToday } from 'date-fns';
import { IoAdd } from 'react-icons/io5';
import Button from '../Button';
import NoteCard from '../NoteCard';
import { getDataForDay, deleteNote } from '../../helpers';
import NothingHere from '../NothingHere';

type NotesSectionProps = {
  date: Date;
  className: string;
};

const NotesSection: React.FunctionComponent<NotesSectionProps> = (props: NotesSectionProps) => {
  const { date, className } = props;
  const [notes, setNotes] = useState<Note[]>(getDataForDay(date).notes);

  return (
    <section className={className}>
      <h2>
        {isToday(date) ? 'Notes for today' : 'Notes'}
        <Button color="secondary" circular={true} fontSize="20px" padding="0">
          <IoAdd />
        </Button>
      </h2>
      <ol>
        {notes.length ? (
          notes.map((note: Note) => (
            <NoteCard
              key={note.id}
              {...note}
              onDelete={(id) => {
                deleteNote(date, id);
                setNotes(getDataForDay(date).notes);
              }}
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
