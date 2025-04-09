export const currentUser = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

export const mockWorkspace = {
  id: "workspace-1",
  name: "My Workspace",
  pages: [
    {
      id: "page-1",
      title: "Getting Started",
      icon: "📚",
      blocks: [
        {
          id: "block-1",
          type: "heading-1",
          content: "Welcome to NoteFlow Studio!",
        },
        {
          id: "block-2",
          type: "paragraph",
          content:
            "This is your new workspace. Here are some things you can do:",
        },
        {
          id: "block-3",
          type: "bulleted-list",
          content: "Create new pages by clicking + in the sidebar",
        },
        {
          id: "block-4",
          type: "bulleted-list",
          content: "Organize your content with different types of blocks",
        },
        {
          id: "block-5",
          type: "bulleted-list",
          content: "Share your pages with others for collaboration",
        },
        {
          id: "block-6",
          type: "paragraph",
          content:
            "To create a new block, press Enter at the end of an existing block or use the + button that appears when you hover near the start of a line.",
        },
        {
          id: "block-7",
          type: "heading-2",
          content: "Block Types",
        },
        {
          id: "block-8",
          type: "paragraph",
          content:
            "NoteFlow Studio supports many different types of content blocks:",
        },
        {
          id: "block-9",
          type: "bulleted-list",
          content: "Text blocks - for regular paragraphs",
        },
        {
          id: "block-10",
          type: "bulleted-list",
          content: "Headings - three levels of headings for organization",
        },
        {
          id: "block-11",
          type: "bulleted-list",
          content: "Lists - both bulleted and numbered",
        },
        {
          id: "block-12",
          type: "bulleted-list",
          content: "To-do lists - for task management",
        },
        {
          id: "block-13",
          type: "heading-2",
          content: "Next Steps",
        },
        {
          id: "block-14",
          type: "paragraph",
          content:
            "Try creating your own content by clicking anywhere and typing. Create new blocks by pressing Enter, and change block types using the formatting toolbar or slash commands.",
        },
      ],
      createdAt: "2025-04-05T10:00:00Z",
      updatedAt: "2025-04-05T15:30:00Z",
      children: [
        {
          id: "page-2",
          title: "Block Types",
          icon: "🧩",
          blocks: [
            {
              id: "block-15",
              type: "heading-1",
              content: "Block Types in NoteFlow Studio",
            },
            {
              id: "block-16",
              type: "paragraph",
              content:
                "NoteFlow Studio offers a variety of block types for organizing your content:",
            },
          ],
          createdAt: "2025-04-06T09:15:00Z",
          updatedAt: "2025-04-06T09:30:00Z",
        },
      ],
    },
    {
      id: "page-3",
      title: "Project Notes",
      icon: "📝",
      blocks: [
        {
          id: "block-17",
          type: "heading-1",
          content: "Project Notes",
        },
        {
          id: "block-18",
          type: "paragraph",
          content: "Use this page to organize your project notes and ideas.",
        },
      ],
      createdAt: "2025-04-07T08:00:00Z",
      updatedAt: "2025-04-07T08:30:00Z",
    },
    {
      id: "page-4",
      title: "Meeting Notes",
      icon: "🗓️",
      blocks: [
        {
          id: "block-19",
          type: "heading-1",
          content: "Meeting Notes",
        },
        {
          id: "block-20",
          type: "paragraph",
          content:
            "Record key points and action items from your meetings here.",
        },
      ],
      createdAt: "2025-04-07T14:00:00Z",
      updatedAt: "2025-04-07T15:30:00Z",
    },
  ],
};

export const getPageById = (pageId) => {
  const page = mockWorkspace.pages.find((p) => p.id === pageId);
  if (page) return page;

  for (const parentPage of mockWorkspace.pages) {
    if (parentPage.children) {
      const childPage = parentPage.children.find((c) => c.id === pageId);
      if (childPage) return childPage;
    }
  }

  return null;
};

export const getAllPages = () => {
  return mockWorkspace.pages;
};

export const updatePageTitle = (pageId, newTitle) => {
  const pageIndex = mockWorkspace.pages.findIndex((p) => p.id === pageId);
  if (pageIndex !== -1) {
    mockWorkspace.pages[pageIndex].title = newTitle;
    mockWorkspace.pages[pageIndex].updatedAt = new Date().toISOString();
    return true;
  }

  for (const parentPage of mockWorkspace.pages) {
    if (parentPage.children) {
      const childIndex = parentPage.children.findIndex((c) => c.id === pageId);
      if (childIndex !== -1) {
        parentPage.children[childIndex].title = newTitle;
        parentPage.children[childIndex].updatedAt = new Date().toISOString();
        return true;
      }
    }
  }

  return false;
};

export const createNewPage = () => {
  const newPage = {
    id: `page-${Date.now()}`, // Simple unique ID based on timestamp
    title: "Untitled Page",
    icon: "📄",
    blocks: [
      {
        id: `block-${Date.now()}`,
        type: "paragraph",
        content: "",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockWorkspace.pages.push(newPage);
  return newPage;
};
