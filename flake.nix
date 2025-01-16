{
  description = "dev env";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in {
      devShells.${system}.default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs
        playwright-driver.browsers
      ];

      PLAYWRIGHT_NODEJS_PATH = "${pkgs.nodejs}/bin/node";
      PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright-driver.browsers}";
      PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = true;

      shellHook = ''
        echo "dev env started"
        fish && echo "exit dev env" && exit
      '';
    };
  };
}