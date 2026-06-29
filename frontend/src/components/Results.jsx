import React, { useEffect, useState } from "react";
import questions from "../data/questions.json";

function Results({ onBack }) {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/results")
            .then((res) => res.json())
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const filteredStudents = students.filter(
        (student) =>
            student.name.toLowerCase().includes(search.toLowerCase()) ||
            student.rollNo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-100 via-white to-zinc-200 p-4 sm:p-6">

            <div className="max-w-7xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-zinc-800">
                        Results Dashboard
                    </h1>

                    <button
                        onClick={onBack}
                        className="mt-4 px-4 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 transition"
                    >
                        ← Back
                    </button>

                    <p className="text-zinc-500 mt-1">
                        View all submitted quiz results
                    </p>
                </div>

                <div className="grid gap-4 mb-6">
                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-zinc-100">
                        <p className="text-zinc-500 text-sm">
                            Total Students
                        </p>

                        <h2 className="text-3xl font-bold text-zinc-800 mt-1">
                            {students.length}
                        </h2>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-zinc-100 p-4 mb-5">

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or roll number..."
                        className="w-full p-3 border-b-2 border-zinc-300 outline-none focus:border-blue-500 bg-transparent"
                    />

                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-zinc-100 overflow-hidden">

                    {loading ? (
                        <div className="p-10 text-center text-zinc-500">
                            Loading Results...
                        </div>
                    ) : filteredStudents.length === 0 ? (
                        <div className="p-10 text-center text-zinc-500">
                            No Results Found
                        </div>
                    ) : (
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-175">

                                <thead>
                                    <tr className="bg-zinc-50 border-b">

                                        <th className="text-left p-4 font-semibold text-zinc-700">
                                            Rank
                                        </th>

                                        <th className="text-left p-4 font-semibold text-zinc-700">
                                            Name
                                        </th>

                                        <th className="text-left p-4 font-semibold text-zinc-700">
                                            Roll No
                                        </th>

                                        <th className="text-left p-4 font-semibold text-zinc-700">
                                            Course
                                        </th>

                                        <th className="text-left p-4 font-semibold text-zinc-700">
                                            Score
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredStudents.map((student, index) => (
                                        <tr
                                            key={student._id}
                                            className="border-b hover:bg-zinc-50 transition-colors"
                                        >
                                            <td className="p-4 font-bold text-zinc-800">
                                                #{index + 1}
                                            </td>
                                            <td className="p-4 font-medium text-zinc-800">
                                                {student.name}
                                            </td>

                                            <td className="p-4 text-zinc-600">
                                                {student.rollNo}
                                            </td>

                                            <td className="p-4 text-zinc-600">
                                                {student.course}
                                            </td>

                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">
                                                        {student.score}/{questions.length}
                                                    </span>

                                                    <span className="text-sm text-zinc-500">
                                                        {((student.score / questions.length) * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Results;

