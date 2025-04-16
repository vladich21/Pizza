import styles from "../NotFoundBlock/styles.module.scss";

const NotFoundBlock = () => {
  return (
    <div>
      <h1 className={styles.root}>
        <span>:O</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует в интернет магазине
      </p>
    </div>
  );
};

export default NotFoundBlock;
