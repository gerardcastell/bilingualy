import React from "react";
import { Page, Navbar, Block, BlockTitle, f7 } from "framework7-react";

export default (props) => (
  <Page>
    <Navbar title="About" backLink="Back" />
    <BlockTitle>About My App</BlockTitle>
    <Block strong>
      <button
        onClick={() =>
          f7.toast.show({
            position: "bottom",
            text: "Custom close button",
            closeButton: true,
            closeButtonText: "Close Me",
            closeButtonColor: "red",
            closeTimeout: 5000,
          })
        }
      >
        Click
      </button>
      <button onClick={() => console.log(props)}>Go to about</button>
      <button onClick={() => props.f7router.navigate("/create/")}>
        Go to about
      </button>
      <p>
        Fugiat perspiciatis excepturi, soluta quod non ullam deleniti. Nobis
        sint nemo consequuntur, fugiat. Eius perferendis animi autem incidunt
        vel quod tenetur nostrum, voluptate omnis quasi quidem illum
        consequuntur, a, quisquam.
      </p>
      <p>
        Laudantium neque magnam vitae nemo quam commodi, in cum dolore obcaecati
        laborum, excepturi harum, optio qui, consequuntur? Obcaecati dolor sequi
        nesciunt culpa quia perspiciatis, reiciendis ex debitis, ut tenetur
        alias.
      </p>
    </Block>
    <Block strong>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
        molestiae laudantium dignissimos est nobis delectus nemo ea alias
        voluptatum architecto, amet similique, saepe iste consectetur in
        repellat ut minus quibusdam!
      </p>
      <p>
        Molestias et distinctio porro nesciunt ratione similique, magni
        doloribus, rerum nobis, aliquam quae reiciendis quasi modi. Nam a
        recusandae, fugiat in ea voluptates fuga eius, velit corrupti
        reprehenderit dignissimos consequatur!
      </p>
      <p>
        Blanditiis, cumque quo adipisci. Molestiae, dolores dolorum quos
        doloremque ipsa ullam eligendi commodi deserunt doloribus inventore
        magni? Ea mollitia veniam nostrum nihil, iusto doloribus a at! Ea
        molestiae ullam delectus!
      </p>
    </Block>
  </Page>
);
