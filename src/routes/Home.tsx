function Home() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-3xl font-bold">Bienvenidos al proyecto</h2>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
        Este es un entorno inicial preparado para trabajar en pareja con React, TypeScript,
        Tailwind CSS y React Router. Aquí pueden empezar a añadir las rutas del quiz,
        la lógica y las pruebas sin tocar este setup base.
      </p>
    </section>
  );
}

export default Home;
