import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us</h2>
      <p>We provide full service at every step.</p>
      <div className="features">
        <div className="feature">
          <div className="circle-background">
            <img src="https://cdn-icons-png.flaticon.com/128/1189/1189175.png" alt="Trusted By Thousands" />
          </div>
          <h3>Trusted By Thousands</h3>
          <p>
            Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim
            donec vel lectus vel felis.
          </p>
        </div>
        <div className="feature">
          <div className="circle-background">
            <img src="https://cdn-icons-png.flaticon.com/128/2413/2413074.png" alt="Wide Range Of Properties" />
          </div>
          <h3>Wide Range Of Properties</h3>
          <p>
            Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim
            donec vel lectus vel felis.
          </p>
        </div>
        <div className="feature">
          <div className="circle-background">
            <img src="https://cdn-icons-png.flaticon.com/128/3833/3833696.png" alt="Financing Made Easy" />
          </div>
          <h3>Financing Made Easy</h3>
          <p>
            Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim
            donec vel lectus vel felis.
          </p>
        </div>
      </div>
    </section>
  );
};

const ArticlesTips = () => {
  return (
    <section className="articles-tips">
      <h2>Articles & Tips</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="articles">
        {[
          {
            imgSrc: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQzM3zNUp5YfcPj2zlRi1Ui3irsSeCg88LqJLhb82oBPCqiTZuC",
            alt: "House 1",
            category: "Business",
            title: "Skills That You Can Learn In The Real Estate Market",
            authorImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoo8JVx-HjVG7eUBr4hEOQm0lM_TiZwQdo0UIUIyaUMlaFPno8GsuYHQlWBJlxEM0cFQs&usqp=CAU",
            author: "Ali Tufan",
            date: "7 August 2022",
          },
          {
            imgSrc: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR6f6tu4ilZz76lCRBGYdiy3aR5uccb3F7Pmu3_v_64aAHWRhRe",
            alt: "House 2",
            category: "Construction",
            title: "Bedroom Colors You will Never Regret very good",
            authorImg: "https://media.voltron.alhurra.com/Drupal/01live-106/styles/sourced/s3/2019-12/2EF0F78E-D4DA-423A-9037-DEBDD029B730.jpg?itok=mt37zUal",
            author: "Ali Tufan",
            date: "7 August 2022",
          },
          {
            imgSrc: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRR12FB-IoC67C57euCS2D31LHkqIIyLsPrEz4YBtqUlR7ZeyNh",
            alt: "House 3",
            category: "Business",
            title: "5 Essential Steps for Buying everyone Investment",
            authorImg: "https://media.voltron.alhurra.com/Drupal/01live-106/styles/sourced/s3/2019-12/2EF0F78E-D4DA-423A-9037-DEBDD029B730.jpg?itok=mt37zUal",
            author: "Ali Tufan",
            date: "7 August 2022",
          },
        ].map((article, index) => (
          <div className="article" key={index}>
            <img src={article.imgSrc} alt={article.alt} />
            <h4>{article.category}</h4>
            <h3>{article.title}</h3>
            <div className="article-footer">
              <img src={article.authorImg} alt="Author" />
              <p>{article.author}</p>
              <p>{article.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div>
      <WhyChooseUs />
      <ArticlesTips />
    </div>
  );
};


export default App;
