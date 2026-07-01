import {
  siAngular, siAnsible, siApachecassandra, siApachekafka, siAstro,
  siBootstrap, siC, siCplusplus, siCloudflare, siCss, siDart,
  siDatadog, siDigitalocean, siDjango, siDocker, siDotnet, siElectron,
  siElasticsearch, siElixir, siExpress, siFastapi, siFlutter,
  siFigma, siFirebase, siGit, siGithub, siGithubactions, siGitlab, siGo,
  siGooglecloud, siGrafana, siHtml5, siIntellijidea, siJavascript, siJenkins,
  siJira, siKotlin, siKubernetes, siLaravel, siLinux, siMariadb, siMongodb,
  siMysql, siNeo4j, siNestjs, siNetlify, siNextdotjs, siNginx, siNodedotjs,
  siNuxt, siOpenjdk, siPhp, siPostgresql, siPostman, siPrometheus, siPython,
  siPytorch, siQdrant, siRabbitmq, siReact, siRedis, siRemix, siRuby,
  siRubyonrails, siRust, siScikitlearn, siSentry, siSonarqubeserver,
  siSpringboot, siSqlite, siSupabase, siSvelte, siSwift, siTailwindcss,
  siTerraform, siTypescript, siUnity, siUnrealengine, siVercel, siVitest,
  siVuedotjs, siWireshark
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import oracleLogo from "devicon/icons/oracle/oracle-original.svg";
import sqlServerLogo from "devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg";
import dynamoDbLogo from "devicon/icons/dynamodb/dynamodb-original.svg";
import vscodeLogo from "devicon/icons/vscode/vscode-original.svg";

const icons: Record<string, SimpleIcon> = {
  html: siHtml5, css: siCss, javascript: siJavascript, typescript: siTypescript,
  python: siPython, java: siOpenjdk, react: siReact, nextjs: siNextdotjs,
  nodejs: siNodedotjs, nestjs: siNestjs, fastapi: siFastapi, pytorch: siPytorch,
  scikitlearn: siScikitlearn, vitest: siVitest,
  postman: siPostman, postgresql: siPostgresql, mysql: siMysql, mongodb: siMongodb,
  redis: siRedis, qdrant: siQdrant, docker: siDocker, kubernetes: siKubernetes,
  terraform: siTerraform, githubactions: siGithubactions, grafana: siGrafana,
  gcp: siGooglecloud, cloudflare: siCloudflare,
  linux: siLinux, wireshark: siWireshark, figma: siFigma,
  go: siGo, php: siPhp, rust: siRust, kotlin: siKotlin,
  swift: siSwift, dart: siDart, ruby: siRuby, c: siC, cpp: siCplusplus,
  elixir: siElixir, vue: siVuedotjs, angular: siAngular, svelte: siSvelte,
  astro: siAstro, nuxt: siNuxt, remix: siRemix, tailwind: siTailwindcss,
  bootstrap: siBootstrap, express: siExpress, django: siDjango,
  laravel: siLaravel, rails: siRubyonrails, sqlite: siSqlite,
  cassandra: siApachecassandra, firebase: siFirebase, elasticsearch: siElasticsearch,
  git: siGit, github: siGithub, gitlab: siGitlab, jenkins: siJenkins,
  prometheus: siPrometheus, kafka: siApachekafka, vercel: siVercel,
  springboot: siSpringboot, dotnet: siDotnet, flutter: siFlutter,
  reactnative: siReact, electron: siElectron, unity: siUnity, unreal: siUnrealengine,
  mariadb: siMariadb, neo4j: siNeo4j, supabase: siSupabase, rabbitmq: siRabbitmq,
  nginx: siNginx, ansible: siAnsible, digitalocean: siDigitalocean, netlify: siNetlify,
  jira: siJira, intellij: siIntellijidea, sonarqube: siSonarqubeserver,
  sentry: siSentry, datadog: siDatadog
};

const aliases: Record<string, { text: string; color: string }> = {
  sql: { text: "SQL", color: "#336791" },
  azure: { text: "AZ", color: "#0078D4" },
  powerbi: { text: "BI", color: "#F2C811" },
  dbt: { text: "dbt", color: "#FF694B" },
  nmap: { text: "N", color: "#4682B4" }
  ,aws: { text: "AWS", color: "#FF9900" },
  csharp: { text: "C#", color: "#512BD4" },
  playwright: { text: "PW", color: "#2EAD33" },
  linkedin: { text: "in", color: "#0A66C2" }
};

const devicons: Record<string, string | { src: string }> = {
  oracle: oracleLogo,
  sqlserver: sqlServerLogo,
  dynamodb: dynamoDbLogo,
  vscode: vscodeLogo
};

export function TechnologyLogo({ id, size = 28 }: { id: string; size?: number }) {
  const icon = icons[id];
  if (icon) {
    const color = icon.hex.toUpperCase() === "FFFFFF" ? "#111111" : `#${icon.hex}`;
    return (
      <svg
        className="technology-logo"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        style={{ color }}
      >
        <path fill="currentColor" d={icon.path} />
      </svg>
    );
  }
  const devicon = devicons[id];
  if (devicon) {
    return <img className="technology-logo" src={typeof devicon === "string" ? devicon : devicon.src} width={size} height={size} alt="" />;
  }
  const alias = aliases[id] ?? { text: id.slice(0, 2).toUpperCase(), color: "#5f6964" };
  return <span className="technology-fallback" aria-hidden="true" style={{ "--logo-color": alias.color, width: size, height: size } as React.CSSProperties}>{alias.text}</span>;
}
