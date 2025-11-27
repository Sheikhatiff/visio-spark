import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Link2,
  StickyNote,
  ExternalLink,
  Clock,
  Pin,
  Search,
  Grid,
  List,
  Sparkles,
} from "lucide-react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // ---- Clerk user ----
  const { user, isLoaded, isSignedIn } = useUser();

  // ---- Local state ----
  const [notes, setNotes] = useState([]);
  const [links, setLinks] = useState([]);
  const [activeTab, setActiveTab] = useState("notes");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  // Note states
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    color: "slate",
    pinned: false,
  });

  // Link states
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    description: "",
    category: "General",
  });

  const noteColors = [
    {
      name: "slate",
      bg: "bg-slate-100",
      border: "border-slate-300",
      text: "text-slate-900",
    },
    {
      name: "emerald",
      bg: "bg-emerald-100",
      border: "border-emerald-300",
      text: "text-emerald-900",
    },
    {
      name: "blue",
      bg: "bg-blue-100",
      border: "border-blue-300",
      text: "text-blue-900",
    },
    {
      name: "purple",
      bg: "bg-purple-100",
      border: "border-purple-300",
      text: "text-purple-900",
    },
    {
      name: "amber",
      bg: "bg-amber-100",
      border: "border-amber-300",
      text: "text-amber-900",
    },
  ];

  // -------------------------------
  // Storage helpers (per Clerk user)
  // -------------------------------
  const notesKey = user ? `user-notes-${user.id}` : null;
  const linksKey = user ? `user-links-${user.id}` : null;

  // Load data when Clerk user is ready
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !notesKey || !linksKey) return;

    try {
      const storedNotes = localStorage.getItem(notesKey);
      const storedLinks = localStorage.getItem(linksKey);

      if (storedNotes) setNotes(JSON.parse(storedNotes));
      if (storedLinks) setLinks(JSON.parse(storedLinks));
    } catch (err) {
      console.error("Failed to load user data:", err);
    }
  }, [isLoaded, isSignedIn, notesKey, linksKey]);

  const saveNotes = (updatedNotes) => {
    if (!notesKey) return;
    try {
      localStorage.setItem(notesKey, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (err) {
      console.error("Failed to save notes:", err);
    }
  };

  const saveLinks = (updatedLinks) => {
    if (!linksKey) return;
    try {
      localStorage.setItem(linksKey, JSON.stringify(updatedLinks));
      setLinks(updatedLinks);
    } catch (err) {
      console.error("Failed to save links:", err);
    }
  };

  // ------------- Note functions -------------
  const handleAddNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const note = {
        id: Date.now(),
        ...newNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveNotes([note, ...notes]);
      setNewNote({ title: "", content: "", color: "slate", pinned: false });
      setIsAddingNote(false);
    }
  };

  const handleUpdateNote = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? { ...note, ...newNote, updatedAt: new Date().toISOString() }
        : note
    );
    saveNotes(updatedNotes);
    setEditingNoteId(null);
    setNewNote({ title: "", content: "", color: "slate", pinned: false });
  };

  const handleDeleteNote = (id) => {
    saveNotes(notes.filter((note) => note.id !== id));
  };

  const handlePinNote = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    saveNotes(updatedNotes);
  };

  const startEditingNote = (note) => {
    setEditingNoteId(note.id);
    setNewNote({
      title: note.title,
      content: note.content,
      color: note.color,
      pinned: note.pinned,
    });
  };

  // ------------- Link functions -------------
  const handleAddLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      const link = {
        id: Date.now(),
        ...newLink,
        createdAt: new Date().toISOString(),
      };
      saveLinks([link, ...links]);
      setNewLink({
        title: "",
        url: "",
        description: "",
        category: "General",
      });
      setIsAddingLink(false);
    }
  };

  const handleUpdateLink = (id) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, ...newLink } : link
    );
    saveLinks(updatedLinks);
    setEditingLinkId(null);
    setNewLink({
      title: "",
      url: "",
      description: "",
      category: "General",
    });
  };

  const handleDeleteLink = (id) => {
    saveLinks(links.filter((link) => link.id !== id));
  };

  const startEditingLink = (link) => {
    setEditingLinkId(link.id);
    setNewLink({
      title: link.title,
      url: link.url,
      description: link.description,
      category: link.category,
    });
  };

  // ------------- Filters / helpers -------------
  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(
      (a, b) =>
        b.pinned - a.pinned ||
        new Date(b.updatedAt) - new Date(a.updatedAt)
    );

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ------------- Loading / auth guards -------------
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        Loading dashboard...
      </div>
    );
  }

  if (!isSignedIn) {
    // Route should already be protected by <SignedIn>, but just in case:
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        You are not signed in.
      </div>
    );
  }

  const displayName =
    user.fullName || user.primaryEmailAddress?.emailAddress || "User";

  // ------------- UI -------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Dashboard
                  </h1>
                  <p className="text-xs text-slate-500">
                    Welcome back, {displayName}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Home
              </Link>
              {/* Clerk UserButton handles profile + logout */}
              <UserButton afterSignOutUrl="/sign-in" />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Notes</p>
                <p className="text-3xl font-bold text-slate-900">
                  {notes.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <StickyNote className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Saved Links</p>
                <p className="text-3xl font-bold text-slate-900">
                  {links.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Link2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">Pinned Notes</p>
                <p className="text-3xl font-bold text-slate-900">
                  {notes.filter((n) => n.pinned).length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Pin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  activeTab === "notes"
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <StickyNote className="w-4 h-4 inline mr-2" />
                Notes
              </button>
              <button
                onClick={() => setActiveTab("links")}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  activeTab === "links"
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Link2 className="w-4 h-4 inline mr-2" />
                Links
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                />
              </div>

              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                {viewMode === "grid" ? (
                  <List className="w-4 h-4" />
                ) : (
                  <Grid className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() =>
                  activeTab === "notes"
                    ? setIsAddingNote(true)
                    : setIsAddingLink(true)
                }
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-lg flex items-center gap-2 text-sm font-medium shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                Add {activeTab === "notes" ? "Note" : "Link"}
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Notes Tab ---------- */}
        {activeTab === "notes" && (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }
          >
            {/* Add Note Form */}
            {isAddingNote && (
              <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 shadow-lg">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote({ ...newNote, title: e.target.value })
                  }
                  className="w-full mb-3 px-3 py-2 border border-slate-200 rounded-lg text-lg font-semibold focus:outline-none focus:border-emerald-500"
                />
                <textarea
                  placeholder="Write your note..."
                  value={newNote.content}
                  onChange={(e) =>
                    setNewNote({ ...newNote, content: e.target.value })
                  }
                  className="w-full mb-3 px-3 py-2 border border-slate-200 rounded-lg resize-none focus:outline-none focus:border-emerald-500"
                  rows={4}
                />
                <div className="flex items-center gap-2 mb-3">
                  {noteColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() =>
                        setNewNote({ ...newNote, color: color.name })
                      }
                      className={`w-8 h-8 rounded-full ${color.bg} ${
                        newNote.color === color.name
                          ? "ring-2 ring-slate-900 ring-offset-2"
                          : ""
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsAddingNote(false);
                      setNewNote({
                        title: "",
                        content: "",
                        color: "slate",
                        pinned: false,
                      });
                    }}
                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Notes */}
            {filteredNotes.map((note) => {
              const colorScheme =
                noteColors.find((c) => c.name === note.color) || noteColors[0];
              return (
                <div
                  key={note.id}
                  className={`${colorScheme.bg} ${colorScheme.border} border-2 rounded-2xl p-6 hover:shadow-lg transition-all relative group`}
                >
                  {note.pinned && (
                    <Pin className="w-4 h-4 absolute top-3 right-3 text-slate-600 fill-slate-600" />
                  )}

                  {editingNoteId === note.id ? (
                    <>
                      <input
                        type="text"
                        value={newNote.title}
                        onChange={(e) =>
                          setNewNote({ ...newNote, title: e.target.value })
                        }
                        className={`w-full mb-3 px-3 py-2 ${colorScheme.bg} border border-slate-300 rounded-lg text-lg font-semibold focus:outline-none`}
                      />
                      <textarea
                        value={newNote.content}
                        onChange={(e) =>
                          setNewNote({ ...newNote, content: e.target.value })
                        }
                        className={`w-full mb-3 px-3 py-2 ${colorScheme.bg} border border-slate-300 rounded-lg resize-none focus:outline-none`}
                        rows={4}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingNoteId(null);
                            setNewNote({
                              title: "",
                              content: "",
                              color: "slate",
                              pinned: false,
                            });
                          }}
                          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUpdateNote(note.id)}
                          className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3
                        className={`text-lg font-bold ${colorScheme.text} mb-2`}
                      >
                        {note.title || "Untitled"}
                      </h3>
                      <p
                        className={`${colorScheme.text} text-sm mb-4 whitespace-pre-wrap`}
                      >
                        {note.content}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(note.updatedAt)}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handlePinNote(note.id)}
                            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                          >
                            <Pin
                              className={`w-4 h-4 ${
                                note.pinned ? "fill-slate-600" : ""
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => startEditingNote(note)}
                            className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="p-1.5 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {filteredNotes.length === 0 && !isAddingNote && (
              <div className="col-span-full text-center py-16">
                <StickyNote className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 mb-2">No notes yet</p>
                <p className="text-sm text-slate-400">
                  Click "Add Note" to create your first note
                </p>
              </div>
            )}
          </div>
        )}

        {/* ---------- Links Tab ---------- */}
        {activeTab === "links" && (
          <div className="space-y-4">
            {/* Add Link Form */}
            {isAddingLink && (
              <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 shadow-lg">
                <input
                  type="text"
                  placeholder="Link title..."
                  value={newLink.title}
                  onChange={(e) =>
                    setNewLink({ ...newLink, title: e.target.value })
                  }
                  className="w-full mb-3 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                  className="w-full mb-3 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newLink.description}
                  onChange={(e) =>
                    setNewLink({
                      ...newLink,
                      description: e.target.value,
                    })
                  }
                  className="w-full mb-3 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
                <select
                  value={newLink.category}
                  onChange={(e) =>
                    setNewLink({ ...newLink, category: e.target.value })
                  }
                  className="w-full mb-3 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                >
                  <option>General</option>
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Learning</option>
                  <option>Entertainment</option>
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsAddingLink(false);
                      setNewLink({
                        title: "",
                        url: "",
                        description: "",
                        category: "General",
                      });
                    }}
                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddLink}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* Links list */}
            {filteredLinks.map((link) => (
              <div
                key={link.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all group"
              >
                {editingLinkId === link.id ? (
                  <>
                    <input
                      type="text"
                      value={newLink.title}
                      onChange={(e) =>
                        setNewLink({ ...newLink, title: e.target.value })
                      }
                      className="w-full mb-3 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="url"
                      value={newLink.url}
                      onChange={(e) =>
                        setNewLink({ ...newLink, url: e.target.value })
                      }
                      className="w-full mb-3 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      value={newLink.description}
                      onChange={(e) =>
                        setNewLink({
                          ...newLink,
                          description: e.target.value,
                        })
                      }
                      className="w-full mb-3 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingLinkId(null);
                          setNewLink({
                            title: "",
                            url: "",
                            description: "",
                            category: "General",
                          });
                        }}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUpdateLink(link.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center flex-shrink-0">
                          <Link2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-slate-900 truncate">
                            {link.title}
                          </h3>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 truncate"
                          >
                            {link.url}
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </div>
                      </div>
                      {link.description && (
                        <p className="text-sm text-slate-600 mb-2 ml-13">
                          {link.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 ml-13">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
                          {link.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDate(link.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditingLink(link)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredLinks.length === 0 && !isAddingLink && (
              <div className="text-center py-16">
                <Link2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 mb-2">No links saved yet</p>
                <p className="text-sm text-slate-400">
                  Click "Add Link" to save your first link
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
