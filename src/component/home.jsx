import React, { useState } from "react";

const home = () => {
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");

    const [notes, setNotes] = useState(() => {
        const rawtodo = localStorage.getItem("yournotes");
        if (!rawtodo) return [];
        return JSON.parse(rawtodo);
    });

    const submitHandler = (e) => {
        e.preventDefault();
        if (!title) return;
        const now = new Date().toLocaleString();

        const copyTask = [...notes];
        copyTask.push({ title, discription, time: now });
        setNotes(copyTask);
        setTitle("");
        setDiscription("");
    };

    // localStorage set item

    localStorage.setItem("yournotes", JSON.stringify(notes));


    // ----------



    const deleteNote = (idx) => {
        const copyNotes = [...notes];
        copyNotes.splice(idx, 1);
        setNotes(copyNotes);
    };

    return (
        <>
            <div className="w-full lg:h-screen bg-black flex flex-col lg:flex-row">

                {/* Form Section */}
                <form
                    onSubmit={submitHandler}
                    className="w-full lg:w-1/2 h-1/2 lg:h-full bg-black p-2 lg:p-10 flex flex-col gap-3"
                >
                    <h1 className="text-2xl uppercase text-white font-[font1]">Add your notes</h1>

                    <input
                        type="text"
                        placeholder="Enter Heading"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-10 border border-white px-2 py-0.5 mt-4 text-white rounded"
                    />

                    <textarea
                        value={discription}
                        onChange={(e) => setDiscription(e.target.value)}
                        placeholder="Enter your notes here..."
                        className="w-full lg:h-70 h-50 border border-white px-2 text-white resize-none rounded"
                    />

                    <button type="submit" className="w-full bg-green-800 text-white py-2 uppercase rounded cursor-pointer">
                        Add Note
                    </button>
                </form>

                {/* Notes Section */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-black px-2 py-3 lg:pt-11 lg:overflow-y-auto">
                    <h1 className="text-2xl uppercase text-white font-[font1]">Your Notes</h1>

                    <div className="lg:pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 pt-5">

                        {notes.length === 0 ? (
                            <div className="lg:w-[50vw] lg:h-[80vh] h-[35vh] bg-black text-white flex justify-center items-center lg:text-2xl text-xl">No notes added</div>
                        ) : (
                            notes.map(function (e, idx) {
                                return (
                                    <div
                                        key={idx}
                                        className="h-[400px] bg-white rounded px-2 py-2 overflow-y-auto relative"
                                    >
                                        <h2 className="text-sm pb-2 italic">{e.time}</h2>

                                        <h1 className="lg:text-2xl text-xl pb-3 uppercase font-[font1]">
                                            {e.title}
                                        </h1>

                                        <p>{e.discription}</p>

                                        <button
                                            onClick={() => deleteNote(idx)}
                                            className="absolute top-1 right-1 bg-red-800 text-white rounded px-2 py-1 cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                );
                            })
                        )}

                    </div>
                </div>

            </div>
        </>
    );
};

export default home;
