export default function Statistics() {
  return (
    <div
      className="
      stats
    stats-vertical 
    self-center
    overflow-hidden 
    bg-primary 
    text-primary-content 
    scrollbar
    scrollbar-thin
    md:stats-horizontal
    "
    >
      <div className="stat w-3/4">
        <div className="stat-title text-primary-content ">Bevétel</div>
        <div className="stat-value">228 696 431 Ft</div>
        <div className="stat-desc grid grid-cols-1 place-items-start text-primary-content sm:grid-cols-2">
          <p>Utalás: 27 959 455 Ft</p>
          <p>Készpénz: 67 652 159 Ft</p>
          <p>Ismeretlen: 133 053 817 Ft</p>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title text-primary-content">Eladott tesztek</div>
        <div className="stat-value">{23221} DB</div>
        <div className="stat-desc grid grid-cols-1 place-items-start text-primary-content sm:grid-cols-2">
          <p>PCR: 4837 Ft</p>
          <p>Antigén: 17989 Ft</p>
          <p>Elisa: 393 Ft</p>
          <p>Szerológiai: 2 Ft</p>
          <p>Post Covid: 0 Ft</p>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title text-primary-content">Munkák</div>
        <div className="stat-value">4961 DB</div>
        <div className="stat-desc grid grid-cols-1 place-items-start text-primary-content">
          <p>Elfogadott munkák: 4957 Ft</p>
          <p>Antigén: 231 Ft</p>
          <p>Elisa: 4730 Ft</p>
        </div>
      </div>
    </div>
  );
}
