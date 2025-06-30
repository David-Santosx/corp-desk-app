export const sidebarItems = {
  user: [
    {
      title: "Chamados",
      items: [
        { name: "Meus Chamados", href: "/tickets", icon: "Ticket" },
        { name: "Novo Chamado", href: "/tickets/new", icon: "PlusCircle" },
      ],
    },
  ],

  tech: [
    {
      title: "Chamados",
      items: [
        { name: "Atribuídos a Mim", href: "/tech/tickets", icon: "UserCheck" },
        { name: "Todos da Categoria", href: "/tech/tickets/all", icon: "ListChecks" },
      ],
    },
    {
      title: "Ferramentas",
      items: [
        { name: "Relatório Diário", href: "/tech/report", icon: "FileText" },
      ],
    },
  ],

  admin: [
    {
      title: "Chamados",
      items: [
        { name: "Todos Chamados", href: "/admin/tickets", icon: "Ticket" },
        { name: "Atribuir Técnico", href: "/admin/tickets/assign", icon: "UserPlus" },
        { name: "Categorias", href: "/admin/categories", icon: "Tags" },
      ],
    },
    {
      title: "Usuários",
      items: [
        { name: "Colaboradores", href: "/admin/users/employees", icon: "Users" },
        { name: "Técnicos", href: "/admin/users/techs", icon: "UserCog" },
        { name: "Novo Usuário", href: "/admin/users/new", icon: "UserPlus" },
      ],
    },
    {
      title: "Relatórios",
      items: [
        { name: "Visão Geral", href: "/admin/reports/overview", icon: "BarChart2" },
        { name: "Por Categoria", href: "/admin/reports/categories", icon: "Tag" },
        { name: "Por Técnico", href: "/admin/reports/techs", icon: "UserCheck" },
      ],
    },
  ],
};